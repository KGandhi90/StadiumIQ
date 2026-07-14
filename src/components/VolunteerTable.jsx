import PropTypes from 'prop-types'
import { StatusPill } from './StatusPill'

/**
 * Volunteer management table for Ops Dashboard.
 * @param {object} props
 * @param {Array} props.volunteers - Volunteer objects
 */

export function VolunteerTable({ volunteers }) {
  return (
    <div className="bg-ops-surface1 border border-ops-surface3 rounded-2xl p-5">
      <h2 className="text-base font-semibold text-white mb-4">
        Active Volunteers
      </h2>

      <div className="overflow-x-auto">
        <table
          className="w-full text-sm"
          aria-label="Active volunteers"
        >
          <thead>
            <tr className="text-ops-muted text-xs uppercase tracking-wide font-mono text-left">
              <th className="pb-3 pr-4 font-medium" scope="col">
                Name
              </th>
              <th
                className="pb-3 pr-4 font-medium hidden sm:table-cell"
                scope="col"
              >
                Role
              </th>
              <th className="pb-3 pr-4 font-medium" scope="col">
                Zone
              </th>
              <th className="pb-3 font-medium" scope="col">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((vol, i) => (
              <tr
                key={vol.id}
                className={`text-white/80 ${
                  i % 2 === 0 ? '' : 'bg-ops-surface2/30'
                }`}
              >
                <td className="py-2.5 pr-4 font-medium">
                  {vol.name}
                </td>
                <td className="py-2.5 pr-4 text-ops-muted hidden sm:table-cell">
                  {vol.role}
                </td>
                <td className="py-2.5 pr-4 font-mono text-xs text-ops-muted">
                  {vol.zone}
                </td>
                <td className="py-2.5">
                  <StatusPill status={vol.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

VolunteerTable.propTypes = {
  volunteers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      zone: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
}
